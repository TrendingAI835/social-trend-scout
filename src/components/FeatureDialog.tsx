import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FeatureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  detailedDescription: string;
}

export function FeatureDialog({
  open,
  onOpenChange,
  title,
  description,
  detailedDescription,
}: FeatureDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p className="text-muted-foreground">{detailedDescription}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}