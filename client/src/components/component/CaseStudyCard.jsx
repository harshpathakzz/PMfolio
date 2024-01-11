import { CardTitle, CardContent, Card } from "@/components/ui/card";

export default function CaseStudyCard({ title, coverImage }) {
  return (
    <Card className="shadow-lg max-w-md mx-auto">
      <img
        alt="Placeholder"
        className="object-cover w-full h-50 rounded-t-lg"
        src={coverImage}
        style={{
          aspectRatio: "16/9",
          objectFit: "cover",
        }}
      />
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold tracking-tight truncate">
          {title}
        </CardTitle>
      </CardContent>
    </Card>
  );
}
