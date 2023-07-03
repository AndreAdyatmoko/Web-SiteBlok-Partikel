import React, { useState } from "react";
import { IconButton, useToast, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const DeletePage = ({ id, onDelete }) => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const handleDeleteArticle = async () => {
    try {
      await onDelete(id);
      onClose();
      toast({
        title: "Article deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something Wrong",
        description: "Unable to delete article",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <IconButton
        colorScheme="gray"
        aria-label="Delete Article"
        icon={<FaTrash />}
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={undefined}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Article
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this article?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="gray" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteArticle} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeletePage;
