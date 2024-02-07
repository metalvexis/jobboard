export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");
  return `Default handler for ${event.path}/${name}`;
});
