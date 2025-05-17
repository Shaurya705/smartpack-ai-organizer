
import { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Checklist, ChecklistCategory, ChecklistItem, TripTemplate } from '@/types';
import { tripTemplates } from '@/data/templates';
import { toast } from 'sonner';

interface ChecklistContextType {
  checklists: Checklist[];
  createChecklist: (name: string, destination: string, startDate: string, endDate: string, templateId?: string) => string;
  getChecklist: (id: string) => Checklist | undefined;
  addCategory: (checklistId: string, categoryName: string) => void;
  removeCategory: (checklistId: string, categoryId: string) => void;
  addItem: (checklistId: string, categoryId: string, itemName: string, quantity: number) => void;
  removeItem: (checklistId: string, categoryId: string, itemId: string) => void;
  toggleItemPacked: (checklistId: string, categoryId: string, itemId: string) => void;
  updateItem: (
    checklistId: string, 
    categoryId: string, 
    itemId: string, 
    updates: Partial<ChecklistItem>
  ) => void;
  deleteChecklist: (checklistId: string) => void;
  getTemplates: () => TripTemplate[];
  getPackedPercentage: (checklistId: string) => number;
}

const ChecklistContext = createContext<ChecklistContextType | null>(null);

export const useChecklists = () => {
  const context = useContext(ChecklistContext);
  if (!context) {
    throw new Error('useChecklists must be used within a ChecklistProvider');
  }
  return context;
};

const defaultDestinationImages: Record<string, string> = {
  "Paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=500&auto=format&fit=crop",
  "New York": "https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80&w=500&auto=format&fit=crop",
  "Tokyo": "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=500&auto=format&fit=crop",
  "London": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=500&auto=format&fit=crop",
  "Sydney": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=500&auto=format&fit=crop",
};

export const ChecklistProvider = ({ children }: { children: ReactNode }) => {
  const [checklists, setChecklists] = useState<Checklist[]>(() => {
    const saved = localStorage.getItem('packsmart-checklists');
    return saved ? JSON.parse(saved) : [];
  });

  const saveChecklists = (newChecklists: Checklist[]) => {
    setChecklists(newChecklists);
    localStorage.setItem('packsmart-checklists', JSON.stringify(newChecklists));
  };

  const getImageUrlForDestination = (destination: string) => {
    const normalizedDestination = destination.trim();
    
    // Check if we have a pre-defined image for this destination
    for (const [key, url] of Object.entries(defaultDestinationImages)) {
      if (normalizedDestination.toLowerCase().includes(key.toLowerCase())) {
        return url;
      }
    }
    
    // Default image if no match
    return "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=500&auto=format&fit=crop";
  };

  const createChecklist = (
    name: string, 
    destination: string, 
    startDate: string, 
    endDate: string, 
    templateId?: string
  ) => {
    let newChecklist: Checklist;
    
    if (templateId) {
      const template = tripTemplates.find(t => t.id === templateId);
      
      if (template) {
        newChecklist = {
          id: uuidv4(),
          name,
          destination,
          startDate,
          endDate,
          categories: template.categories.map(cat => ({
            id: uuidv4(),
            name: cat.name,
            items: cat.items.map(item => ({
              id: uuidv4(),
              name: item.name,
              quantity: item.quantity,
              isPacked: false,
            })),
          })),
          imageUrl: getImageUrlForDestination(destination),
        };
      } else {
        // Fallback to default categories if template not found
        newChecklist = createDefaultChecklist(name, destination, startDate, endDate);
      }
    } else {
      newChecklist = createDefaultChecklist(name, destination, startDate, endDate);
    }

    saveChecklists([...checklists, newChecklist]);
    toast.success("Checklist created successfully");
    return newChecklist.id;
  };

  const createDefaultChecklist = (
    name: string,
    destination: string,
    startDate: string,
    endDate: string
  ): Checklist => ({
    id: uuidv4(),
    name,
    destination,
    startDate,
    endDate,
    categories: [
      {
        id: uuidv4(),
        name: 'Essentials',
        items: [
          { id: uuidv4(), name: 'Phone', isPacked: false, quantity: 1 },
          { id: uuidv4(), name: 'Wallet', isPacked: false, quantity: 1 },
          { id: uuidv4(), name: 'Keys', isPacked: false, quantity: 1 },
          { id: uuidv4(), name: 'Charger', isPacked: false, quantity: 1 },
        ],
      },
      {
        id: uuidv4(),
        name: 'Clothing',
        items: [
          { id: uuidv4(), name: 'T-shirts', isPacked: false, quantity: 3 },
          { id: uuidv4(), name: 'Pants', isPacked: false, quantity: 2 },
          { id: uuidv4(), name: 'Underwear', isPacked: false, quantity: 5 },
          { id: uuidv4(), name: 'Socks', isPacked: false, quantity: 5 },
        ],
      },
      {
        id: uuidv4(),
        name: 'Toiletries',
        items: [
          { id: uuidv4(), name: 'Toothbrush', isPacked: false, quantity: 1 },
          { id: uuidv4(), name: 'Toothpaste', isPacked: false, quantity: 1 },
          { id: uuidv4(), name: 'Shampoo', isPacked: false, quantity: 1 },
          { id: uuidv4(), name: 'Deodorant', isPacked: false, quantity: 1 },
        ],
      },
      {
        id: uuidv4(),
        name: 'Documents',
        items: [
          { id: uuidv4(), name: 'Passport', isPacked: false, quantity: 1 },
          { id: uuidv4(), name: 'ID Card', isPacked: false, quantity: 1 },
          { id: uuidv4(), name: 'Travel Insurance', isPacked: false, quantity: 1 },
          { id: uuidv4(), name: 'Hotel Booking', isPacked: false, quantity: 1 },
        ],
      },
    ],
    imageUrl: getImageUrlForDestination(destination),
  });

  const getChecklist = (id: string) => {
    return checklists.find(checklist => checklist.id === id);
  };

  const addCategory = (checklistId: string, categoryName: string) => {
    const newChecklists = checklists.map(checklist => {
      if (checklist.id === checklistId) {
        return {
          ...checklist,
          categories: [
            ...checklist.categories,
            {
              id: uuidv4(),
              name: categoryName,
              items: [],
            },
          ],
        };
      }
      return checklist;
    });
    
    saveChecklists(newChecklists);
    toast.success(`Added ${categoryName} category`);
  };

  const removeCategory = (checklistId: string, categoryId: string) => {
    const newChecklists = checklists.map(checklist => {
      if (checklist.id === checklistId) {
        return {
          ...checklist,
          categories: checklist.categories.filter(category => category.id !== categoryId),
        };
      }
      return checklist;
    });
    
    saveChecklists(newChecklists);
    toast.success("Category removed");
  };

  const addItem = (checklistId: string, categoryId: string, itemName: string, quantity: number) => {
    const newChecklists = checklists.map(checklist => {
      if (checklist.id === checklistId) {
        return {
          ...checklist,
          categories: checklist.categories.map(category => {
            if (category.id === categoryId) {
              return {
                ...category,
                items: [
                  ...category.items,
                  {
                    id: uuidv4(),
                    name: itemName,
                    isPacked: false,
                    quantity,
                  },
                ],
              };
            }
            return category;
          }),
        };
      }
      return checklist;
    });
    
    saveChecklists(newChecklists);
    toast.success(`Added ${itemName} to your list`);
  };

  const removeItem = (checklistId: string, categoryId: string, itemId: string) => {
    const newChecklists = checklists.map(checklist => {
      if (checklist.id === checklistId) {
        return {
          ...checklist,
          categories: checklist.categories.map(category => {
            if (category.id === categoryId) {
              return {
                ...category,
                items: category.items.filter(item => item.id !== itemId),
              };
            }
            return category;
          }),
        };
      }
      return checklist;
    });
    
    saveChecklists(newChecklists);
  };

  const toggleItemPacked = (checklistId: string, categoryId: string, itemId: string) => {
    const newChecklists = checklists.map(checklist => {
      if (checklist.id === checklistId) {
        return {
          ...checklist,
          categories: checklist.categories.map(category => {
            if (category.id === categoryId) {
              return {
                ...category,
                items: category.items.map(item => {
                  if (item.id === itemId) {
                    return {
                      ...item,
                      isPacked: !item.isPacked,
                    };
                  }
                  return item;
                }),
              };
            }
            return category;
          }),
        };
      }
      return checklist;
    });
    
    saveChecklists(newChecklists);
  };

  const updateItem = (
    checklistId: string, 
    categoryId: string, 
    itemId: string, 
    updates: Partial<ChecklistItem>
  ) => {
    const newChecklists = checklists.map(checklist => {
      if (checklist.id === checklistId) {
        return {
          ...checklist,
          categories: checklist.categories.map(category => {
            if (category.id === categoryId) {
              return {
                ...category,
                items: category.items.map(item => {
                  if (item.id === itemId) {
                    return {
                      ...item,
                      ...updates,
                    };
                  }
                  return item;
                }),
              };
            }
            return category;
          }),
        };
      }
      return checklist;
    });
    
    saveChecklists(newChecklists);
  };

  const deleteChecklist = (checklistId: string) => {
    const newChecklists = checklists.filter(checklist => checklist.id !== checklistId);
    saveChecklists(newChecklists);
    toast.success("Checklist deleted");
  };

  const getTemplates = () => {
    return tripTemplates;
  };

  const getPackedPercentage = (checklistId: string): number => {
    const checklist = getChecklist(checklistId);
    if (!checklist) return 0;
    
    let totalItems = 0;
    let packedItems = 0;
    
    checklist.categories.forEach(category => {
      category.items.forEach(item => {
        totalItems++;
        if (item.isPacked) {
          packedItems++;
        }
      });
    });
    
    return totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;
  };

  return (
    <ChecklistContext.Provider
      value={{
        checklists,
        createChecklist,
        getChecklist,
        addCategory,
        removeCategory,
        addItem,
        removeItem,
        toggleItemPacked,
        updateItem,
        deleteChecklist,
        getTemplates,
        getPackedPercentage,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
};
