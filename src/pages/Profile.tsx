
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useChecklists } from "@/contexts/ChecklistContext";
import { PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { checklists } = useChecklists();

  return (
    <PageLayout title="Profile">
      <div className="py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center py-6">
          <div className="h-24 w-24 rounded-full bg-packsmart-100 flex items-center justify-center mb-4 animate-bounce-subtle">
            <PackageCheck className="h-12 w-12 text-packsmart-500" />
          </div>
          <h1 className="text-2xl font-bold">PackSmart AI</h1>
          <p className="text-muted-foreground">Smart packing for every trip</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-medium">Your Stats</h2>
            <div className="flex items-center justify-between py-2 border-b">
              <span>Total trips</span>
              <span className="font-medium">{checklists.length}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span>Total packed items</span>
              <span className="font-medium">
                {checklists.reduce(
                  (acc, checklist) =>
                    acc +
                    checklist.categories.reduce(
                      (catAcc, category) =>
                        catAcc +
                        category.items.filter((item) => item.isPacked).length,
                      0
                    ),
                  0
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-packsmart-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-medium mb-2">Welcome to PackSmart AI</h2>
          <p className="text-muted-foreground mb-4">
            Your AI-powered packing assistant. Create smart packing lists for any trip.
          </p>
          {checklists.length === 0 ? (
            <Link to="/new">
              <Button className="bg-packsmart-500 hover:bg-packsmart-600">
                Create your first packing list
              </Button>
            </Link>
          ) : (
            <Link to="/new">
              <Button className="bg-packsmart-500 hover:bg-packsmart-600">
                Create a new packing list
              </Button>
            </Link>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-center text-sm text-muted-foreground">
            PackSmart AI v1.0
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
