/* eslint-disable react/jsx-no-useless-fragment */
import { Eye, EyeOff } from 'lucide-react';

export function Eyes({ visible, size }: { visible: boolean; size?: number }) {
  return <>{visible ? <Eye size={size} /> : <EyeOff size={size} />}</>;
}
