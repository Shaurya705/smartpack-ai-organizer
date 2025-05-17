
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useChecklists } from "@/contexts/ChecklistContext";
import PageLayout from "@/components/layout/PageLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TripTemplate } from "@/types";
import { CheckCircle } from "lucide-react";

const NewChecklist = () => {
  const navigate = useNavigate();
  const { createChecklist, getTemplates } = useChecklists();
  const templates = getTemplates();
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      destination: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (data: { name: string; destination: string; startDate: string; endDate: string }) => {
    const newChecklistId = createChecklist(
      data.name,
      data.destination,
      data.startDate,
      data.endDate,
      selectedTemplate || undefined
    );
    navigate(`/checklist/${newChecklistId}`);
  };

  return (
    <PageLayout title="Create New Checklist" showBackButton>
      <div className="py-6 space-y-6 animate-fade-in max-w-md mx-auto">
        {step === 1 && (
          <div className="space-y-4 animate-slide-in">
            <h2 className="text-xl font-medium">Choose a template</h2>
            <p className="text-muted-foreground">
              Start with a template or create your own custom list
            </p>
            <div className="grid grid-cols-1 gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer overflow-hidden card-shadow transition-all ${
                    selectedTemplate === template.id
                      ? "border-packsmart-500 ring-1 ring-packsmart-500"
                      : "hover:border-packsmart-300"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="grid md:grid-cols-5">
                    <div className="md:col-span-2">
                      <div className="h-32 md:h-full">
                        <img
                          src={template.imageUrl}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <CardContent className="p-4 md:col-span-3 relative">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {template.description}
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mt-2">
                        {template.categories.length} categories •{" "}
                        {template.categories.reduce((acc, cat) => acc + cat.items.length, 0)} items
                      </p>
                      {selectedTemplate === template.id && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle className="text-packsmart-500 h-6 w-6" />
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
              
              <Card
                className={`cursor-pointer overflow-hidden card-shadow transition-all ${
                  selectedTemplate === "custom"
                    ? "border-packsmart-500 ring-1 ring-packsmart-500"
                    : "hover:border-packsmart-300"
                }`}
                onClick={() => setSelectedTemplate("custom")}
              >
                <CardContent className="p-4 relative flex items-center justify-center h-32">
                  <div className="text-center">
                    <h3 className="font-medium">Custom List</h3>
                    <p className="text-sm text-muted-foreground">
                      Start from scratch
                    </p>
                  </div>
                  {selectedTemplate === "custom" && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="text-packsmart-500 h-6 w-6" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="pt-4">
              <Button
                className="w-full bg-packsmart-500 hover:bg-packsmart-600"
                onClick={() => setStep(2)}
                disabled={!selectedTemplate}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-slide-in">
            <h2 className="text-xl font-medium">Trip Details</h2>
            <p className="text-muted-foreground">
              Enter information about your trip
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Trip Name</Label>
                <Input
                  id="name"
                  placeholder="Weekend in Paris"
                  {...register("name", { required: "Trip name is required" })}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="Paris, France"
                  {...register("destination", { required: "Destination is required" })}
                />
                {errors.destination && (
                  <p className="text-destructive text-sm">{errors.destination.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register("startDate", { required: "Start date is required" })}
                  />
                  {errors.startDate && (
                    <p className="text-destructive text-sm">{errors.startDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    {...register("endDate", { required: "End date is required" })}
                  />
                  {errors.endDate && (
                    <p className="text-destructive text-sm">{errors.endDate.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-1/3"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={!isValid}
                className="w-2/3 bg-packsmart-500 hover:bg-packsmart-600"
              >
                Create Checklist
              </Button>
            </div>
          </form>
        )}
      </div>
    </PageLayout>
  );
};

export default NewChecklist;
