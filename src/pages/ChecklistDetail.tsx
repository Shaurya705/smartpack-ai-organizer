
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChecklists } from "@/contexts/ChecklistContext";
import PageLayout from "@/components/layout/PageLayout";
import { formatDateRange } from "@/utils/dateUtils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Trash2,
  Plus,
  Edit,
  Check,
  PackageCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const ChecklistDetail = () => {
  const { checklistId } = useParams<{ checklistId: string }>();
  const navigate = useNavigate();
  const {
    getChecklist,
    deleteChecklist,
    getPackedPercentage,
    addCategory,
    removeCategory,
    addItem,
    removeItem,
    toggleItemPacked,
    updateItem,
  } = useChecklists();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  
  if (!checklistId) {
    navigate("/");
    return null;
  }

  const checklist = getChecklist(checklistId);
  
  if (!checklist) {
    navigate("/");
    return null;
  }

  const packedPercentage = getPackedPercentage(checklistId);
  
  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(checklistId, newCategoryName);
      setNewCategoryName("");
    }
  };

  const handleAddItem = () => {
    if (currentCategoryId && newItemName.trim()) {
      addItem(checklistId, currentCategoryId, newItemName, newItemQuantity);
      setNewItemName("");
      setNewItemQuantity(1);
    }
  };

  const handleDeleteChecklist = () => {
    deleteChecklist(checklistId);
    navigate("/");
  };

  const handleToggleCategory = (categoryId: string) => {
    setOpenCategories(prevOpen => 
      prevOpen.includes(categoryId) 
        ? prevOpen.filter(id => id !== categoryId) 
        : [...prevOpen, categoryId]
    );
  };

  const totalItems = checklist.categories.reduce((acc, category) => acc + category.items.length, 0);
  const packedItems = checklist.categories.reduce(
    (acc, category) => acc + category.items.filter((item) => item.isPacked).length, 
    0
  );

  return (
    <PageLayout title={checklist.name} showBackButton>
      <div className="py-6 space-y-6 animate-fade-in">
        {/* Checklist Header */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-32">
            <img
              src={checklist.imageUrl}
              alt={checklist.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-medium text-lg">{checklist.destination}</h3>
              <p className="text-white/80 text-sm">
                {formatDateRange(checklist.startDate, checklist.endDate)}
              </p>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <PackageCheck className="mr-2 h-5 w-5 text-packsmart-500" />
                <div>
                  <span className="font-medium">{packedItems}/{totalItems} packed</span>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this checklist?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your checklist.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteChecklist} className="bg-destructive hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Progress value={packedPercentage} className="h-2" />
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Packing List</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add Category</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                  <DialogDescription>
                    Create a new category to organize your items.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input
                      id="categoryName"
                      placeholder="e.g. Electronics, Beach Gear"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateCategory} className="bg-packsmart-500 hover:bg-packsmart-600">
                    Create Category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Accordion type="multiple" value={openCategories}>
            {checklist.categories.map((category) => (
              <AccordionItem key={category.id} value={category.id} className="border rounded-md mb-4">
                <AccordionTrigger 
                  className="px-4 hover:bg-muted/50"
                  onClick={() => handleToggleCategory(category.id)}
                >
                  <div className="flex justify-between items-center w-full pr-4">
                    <span>{category.name}</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{category.items.filter(item => item.isPacked).length}/{category.items.length}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-4 pb-4 space-y-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Item
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Item</DialogTitle>
                          <DialogDescription>
                            Add a new item to the {category.name} category.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="itemName">Item Name</Label>
                            <Input
                              id="itemName"
                              placeholder="e.g. Toothbrush, Phone charger"
                              value={newItemName}
                              onChange={(e) => {
                                setNewItemName(e.target.value);
                                setCurrentCategoryId(category.id);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="itemQuantity">Quantity</Label>
                            <div className="flex items-center">
                              <button
                                type="button"
                                className="p-2 border rounded-l-md"
                                onClick={() => setNewItemQuantity(Math.max(1, newItemQuantity - 1))}
                              >
                                -
                              </button>
                              <Input
                                id="itemQuantity"
                                type="number"
                                min="1"
                                className="rounded-none text-center"
                                value={newItemQuantity}
                                onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
                              />
                              <button
                                type="button"
                                className="p-2 border rounded-r-md"
                                onClick={() => setNewItemQuantity(newItemQuantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAddItem} className="bg-packsmart-500 hover:bg-packsmart-600">
                            Add Item
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {category.items.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        <p>No items yet</p>
                      </div>
                    )}

                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-2 rounded-md ${
                          item.isPacked ? "bg-packsmart-50" : "bg-card hover:bg-muted/50"
                        } transition-colors`}
                      >
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleItemPacked(checklistId, category.id, item.id)}
                            className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                              item.isPacked
                                ? "bg-packsmart-500 text-white"
                                : "border border-muted-foreground"
                            }`}
                          >
                            {item.isPacked && <Check className="w-4 h-4" />}
                          </button>
                          <div className={item.isPacked ? "line-through text-muted-foreground" : ""}>
                            <div className="flex items-center">
                              <span>{item.name}</span>
                              {item.quantity > 1 && (
                                <span className="ml-2 text-sm text-muted-foreground">
                                  x{item.quantity}
                                </span>
                              )}
                            </div>
                            {item.notes && (
                              <p className="text-xs text-muted-foreground">{item.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit {item.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="editItemName">Item Name</Label>
                                  <Input
                                    id="editItemName"
                                    defaultValue={item.name}
                                    onChange={(e) => {
                                      updateItem(checklistId, category.id, item.id, {
                                        name: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="editItemQuantity">Quantity</Label>
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      className="p-2 border rounded-l-md"
                                      onClick={() => {
                                        updateItem(checklistId, category.id, item.id, {
                                          quantity: Math.max(1, item.quantity - 1),
                                        });
                                      }}
                                    >
                                      -
                                    </button>
                                    <Input
                                      id="editItemQuantity"
                                      type="number"
                                      min="1"
                                      className="rounded-none text-center"
                                      defaultValue={item.quantity}
                                      onChange={(e) => {
                                        updateItem(checklistId, category.id, item.id, {
                                          quantity: parseInt(e.target.value) || 1,
                                        });
                                      }}
                                    />
                                    <button
                                      type="button"
                                      className="p-2 border rounded-r-md"
                                      onClick={() => {
                                        updateItem(checklistId, category.id, item.id, {
                                          quantity: item.quantity + 1,
                                        });
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="editItemNotes">Notes (Optional)</Label>
                                  <Input
                                    id="editItemNotes"
                                    defaultValue={item.notes || ""}
                                    placeholder="Add notes"
                                    onChange={(e) => {
                                      updateItem(checklistId, category.id, item.id, {
                                        notes: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="destructive"
                                  onClick={() => {
                                    removeItem(checklistId, category.id, item.id);
                                    toast.success("Item deleted");
                                  }}
                                >
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                  {category.items.length > 0 && (
                    <div className="px-4 pb-2 pt-2 border-t flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        {category.items.filter(item => item.isPacked).length} of {category.items.length} packed
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90">
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span>Delete Category</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete {category.name} category?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will delete the category and all its items.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => removeCategory(checklistId, category.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChecklistDetail;
