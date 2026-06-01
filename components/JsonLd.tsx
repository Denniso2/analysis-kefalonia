/** Inlines a JSON-LD <script>. Data is static/trusted, so dangerouslySetInnerHTML is safe. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
