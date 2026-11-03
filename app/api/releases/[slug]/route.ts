import { getProject } from "@/content/projects";
import { getLatestRelease } from "@/lib/github";

export async function GET(_req: Request, ctx: RouteContext<"/api/releases/[slug]">) {
  const project = getProject((await ctx.params).slug);
  if (!project) return Response.json({ error: "unknown project" }, { status: 404 });

  const release = await getLatestRelease(project.repo);
  if (!release) return Response.json({ error: "no release published" }, { status: 404 });

  return Response.json(release);
}
