import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerContent, DrawerPortal } from '@/components/ui/drawer';
import React from 'react'

const DeleteLocation = () => {
    const onSubmit = () => {
        console.log("delete");
      };
    
      return (
        <DrawerPortal>
          <DrawerContent className="lg:w-[60%] mx-auto rounded-t-lg px-2 pb-4 h-fit">
            <div className="text-lg pt-9 pb-9 w-full text-center">
                Are you sure you want to delete this class?
            </div>
              <div className="flex gap-4 px-4 mb-4">
                <DrawerClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-grow text-lg h-12"
                  >
                    Cancel
                  </Button>
                </DrawerClose>

                <Button
                  type="button"
                //   onClick={() => handleDelete(entry.routineId)}
                  variant="destructive"
                  className="flex-grow h-12 text-lg"
                >
                  Delete
                </Button>
              </div>
            </DrawerContent>
        </DrawerPortal>
      );
}

export default DeleteLocation
