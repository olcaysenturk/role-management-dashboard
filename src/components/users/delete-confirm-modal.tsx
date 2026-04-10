
import { Modal, Button } from "@/components/ui";
import { TriangleAlertIcon } from "@/components/icons";
import { useLanguage } from "@/hooks/language";
import { DeleteConfirmModalProps } from "@/types/dashboard";

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: DeleteConfirmModalProps) {
  const { messages } = useLanguage();
  const t = messages.users;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.delete}>
      <div className="flex flex-col items-center text-center py-2">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
          <TriangleAlertIcon className="w-6 h-6" />
        </div>
        <p className="text-gray-900 font-medium mb-2">{t.delete_confirm}</p>
        <p className="text-gray-500 text-sm mb-6 font-medium">
          {userName}
        </p>
        <div className="flex w-full space-x-3">
          <Button className="flex-1" variant="secondary" onClick={onClose}>
            {t.cancel}
          </Button>
          <Button className="flex-1" variant="destructive" onClick={onConfirm}>
            {t.delete}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
