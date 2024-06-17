"use client";

import React, { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { toast } from "sonner";
import { getCourseById, updateCourseById } from "@/lib/api";
import { useCurrentToken } from "@/hooks/use-current-token";
import LoadingSpinner from "@/components/LoadingSpinner";

interface VideoAssetProps {
  initialUrl?: string;
  moduleId: string;
}

const VideoUploadMux: React.FC<VideoAssetProps> = ({
  initialUrl,
  moduleId,
}) => {
  const [url, setUrl] = useState<string>(initialUrl || "");
  const [playbackId, setPlaybackId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const [checkingVideo, setCheckingVideo] = useState<boolean>(false);
  const token = useCurrentToken();

  const getCourse = async () => {
    try {
      setCheckingVideo(true);
      const getVideo = await getCourseById(moduleId, token);
      const assetId = getVideo.video;

      if (assetId) {
        const videoExists = await checkVideoExistence(assetId);
        if (videoExists) {
          const playbackId = await getPlaybackId(assetId);
          if (playbackId) {
            setPlaybackId(playbackId);
          } else {
            toast.error("The video does not exist on Mux.");
            await updateCourseById(moduleId, { video: "" }, token);
          }
        } else {
          toast.error("The video does not exist on Mux.");
          await updateCourseById(moduleId, { video: "" }, token);
        }
      }
    } catch (error) {
      console.error("Error fetching course video", error);
    } finally {
      setCheckingVideo(false);
    }
  };

  const checkVideoExistence = async (assetId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/status?assetId=${assetId}`);
      const data = await response.json();
      return data.asset && data.asset.status === "ready";
    } catch (error) {
      console.error("Error checking video existence", error);
      return false;
    }
  };

  const getPlaybackId = async (assetId: string): Promise<string | null> => {
    try {
      const response = await fetch(`/api/status?assetId=${assetId}`);
      const data = await response.json();
      return data.asset &&
        data.asset.playback_ids &&
        data.asset.playback_ids.length > 0
        ? data.asset.playback_ids[0].id
        : null;
    } catch (error) {
      console.error("Error getting playback ID", error);
      return null;
    }
  };

  useEffect(() => {
    getCourse();
  }, [moduleId, token]);

  const createAsset = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (data.asset && data.asset.id) {
        toast.success("Video upload started successfully.");
        await pollAssetStatus(data.asset.id);
      } else {
        console.error("Failed to start video upload.");
        toast.error("Failed to start video upload.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading video", error);
      toast.error("An error occurred during video upload.");
      setLoading(false);
    }
  };

  const pollAssetStatus = async (assetId: string) => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`/api/status?assetId=${assetId}`);
        const data = await response.json();

        if (data.asset && data.asset.status === "ready") {
          const playbackId = data.asset.playback_ids[0].id;
          setPlaybackId(playbackId);
          await updateCourseById(moduleId, { video: assetId }, token);
          toast.success("Video is ready to play.");
          setLoading(false);
          setShowUploadForm(false);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error polling video status", error);
        toast.error("An error occurred while retrieving video status.");
        setLoading(false);
        clearInterval(intervalId);
      }
    }, 5000);
  };

  const handleUploadNewVideo = () => {
    setShowUploadForm(true);
    setPlaybackId(null);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {checkingVideo ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <LoadingSpinner />
          <p className="mt-2 text-gray-600"></p>
        </div>
      ) : (
        <>
          {!showUploadForm && playbackId ? (
            <div className="mt-4 w-full">
              <MuxPlayer
                playbackId={playbackId}
                metadata={{
                  video_id: "video-id-54321",
                  video_title: "Test video title",
                  viewer_user_id: "user-id-007",
                }}
                className="w-full"
              />
              <Button
                onClick={handleUploadNewVideo}
                className="mt-4"
                variant="outline"
              >
                Upload New Video
              </Button>
            </div>
          ) : (
            <form
              onSubmit={createAsset}
              className="flex flex-col items-center w-full gap-4"
            >
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter video URL"
                className="px-4 py-2 border border-gray-300 rounded w-full"
              />
              <Alert variant={"destructive"}>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Notice!</AlertTitle>
                <AlertDescription>
                  You must copy a video link from your Google Drive.
                </AlertDescription>
              </Alert>
              <Button
                type="submit"
                variant="outline"
                className={`w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner text="Uploading..." />
                  </>
                ) : (
                  "Upload Video"
                )}
              </Button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default VideoUploadMux;
