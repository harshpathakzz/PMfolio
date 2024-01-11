import { CardTitle, CardContent, Card } from "@/components/ui/card";

export default function CaseStudyCard({ title, coverImage }) {
  return (
    <Card className="shadow-lg max-w-md mx-auto">
      <img
        alt="Placeholder"
        className="object-cover w-full h-60 rounded-t-lg"
        height="200"
        src={coverImage}
        style={{
          aspectRatio: "400/200",
          objectFit: "cover",
        }}
        width="400"
      />
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold tracking-tight truncate ">
          {title}
        </CardTitle>
      </CardContent>
    </Card>
  );
}
