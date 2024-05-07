import { getUserById } from "@/lib/api";

export default async function Page({
  params,
}: {
  params: { id: string; token: string };
}) {
  const response = await getUserById(params.id, params.token);

  return (
    <form className="w-full mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(response).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="block text-foreground text-sm font-bold mb-2 capitalize">
              {key}:
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={value}
              readOnly
            />
          </div>
        ))}
      </div>
    </form>
  );
}
