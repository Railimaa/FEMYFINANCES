import { Eye, EyeClosed } from 'lucide-react';

type EyeIconProps = {
  open: boolean;
};

export function EyeIcon({ open }: EyeIconProps) {
  return open ? <Eye /> : <EyeClosed />;
}
