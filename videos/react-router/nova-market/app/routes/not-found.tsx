import { data } from "react-router";

// the splat route matches any URL nothing else matched
export function loader() {
  throw data("Page not found", { status: 404 });
}

export default function NotFound() {
  return null;
}
