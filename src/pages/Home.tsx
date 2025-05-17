
import { useState } from "react";
import { Link } from "react-router-dom";
import { useChecklists } from "@/contexts/ChecklistContext";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatDateRange } from "@/utils/dateUtils";

const Home = () => {
  const { checklists, getPackedPercentage } = useChecklists();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChecklists = checklists.filter(
    (list) =>
      list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout title="PackSmart AI">
      <div className="pt-4 pb-6 space-y-6 animate-fade-in">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your trips..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredChecklists.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-12 pb-6 text-center animate-slide-in">
            <div className="rounded-full bg-packsmart-100 p-6 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-packsmart-500"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">No trips yet</h2>
            <p className="text-muted-foreground mb-6">
              Start by creating your first packing list
            </p>
            <Link to="/new">
              <Button className="bg-packsmart-500 hover:bg-packsmart-600">
                Create a packing list
              </Button>
            </Link>
          </div>
        )}

        {filteredChecklists.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Your trips</h2>
              <Link to="/new">
                <Button variant="outline" size="sm">New list</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredChecklists.map((checklist) => (
                <Link key={checklist.id} to={`/checklist/${checklist.id}`}>
                  <Card className="overflow-hidden card-shadow hover:border-packsmart-300 transition-all">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={checklist.imageUrl}
                        alt={checklist.destination}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-medium text-lg">{checklist.name}</h3>
                        <p className="text-white/80 text-sm">{checklist.destination}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {formatDateRange(checklist.startDate, checklist.endDate)}
                        </span>
                        <div className="flex items-center">
                          <div className="h-2 w-16 bg-muted rounded-full overflow-hidden mr-2">
                            <div
                              className="h-full bg-packsmart-500"
                              style={{ width: `${getPackedPercentage(checklist.id)}%` }}
                            />
                          </div>
                          <span className="text-sm">{getPackedPercentage(checklist.id)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Home;
