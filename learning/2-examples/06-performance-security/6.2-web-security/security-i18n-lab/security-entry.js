import DOMPurify from "dompurify";
// SOURCE_ONLY_PUBLIC_DEMO: source maps can expose comments even when hidden.
const input =
  '<img src=x onerror="window.xssMarker=true"><b>Allowed bold</b><script>window.xssMarker=true</script><a href="javascript:window.xssMarker=true">bad link</a>';
document.querySelector("#text").textContent = input;
const purified = DOMPurify.sanitize(input, {
  ALLOWED_TAGS: ["b", "em"],
  ALLOWED_ATTR: [],
});
// Only the explicitly sanitized value enters this HTML sink. Do not mutate it afterward.
document.querySelector("#rich").innerHTML = purified;
document.querySelector("#result").textContent = "Text and sanitized HTML ready";
