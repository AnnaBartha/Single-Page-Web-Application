import { useQuery } from '@tanstack/react-query';
import { getIngatlanById } from '../api/ingatlanok.api';

const IngatlanDetailsHook = (id: number) => {
  return useQuery({
    queryKey: ['ingatlan', id],
    queryFn: () => getIngatlanById(id),
  });
};

export default IngatlanDetailsHook;
