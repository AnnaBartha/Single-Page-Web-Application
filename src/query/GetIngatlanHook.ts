import { useQuery } from '@tanstack/react-query';
import { fetchAllIngatlans } from '../api/ingatlanok.api';

const GetIngatlanHook = () => {
  return useQuery({
    queryKey: ['ingatlan'],
    queryFn: fetchAllIngatlans,
  });
};

export default GetIngatlanHook;
