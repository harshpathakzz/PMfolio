import { CardTitle, CardContent, Card } from "@/components/ui/card";

const CaseStudyCard = ({ caseStudyId, title, coverImage, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(caseStudyId);
    }
  };

  return (
    <Card
      className="shadow-lg max-w-md mx-auto cursor-pointer"
      onClick={handleClick}
    >
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
};

export default CaseStudyCard;
