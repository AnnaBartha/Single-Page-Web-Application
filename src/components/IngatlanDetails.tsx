import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ingatlanDelete } from '../api/ingatlanok.api';
import IngatlanDetailsHook from '../query/IngatlanDetailsHook';

export default function IngatlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = IngatlanDetailsHook(Number(id));

  if (isLoading) {
    return <div>Process ...</div>;
  }

  if (isError) {
    return <div className="error">{error?.message}</div>;
  }

  if (!data) {
    return <div>Oldal eleresi hiba</div>;
  }

  const UpdateIngatlan = () => {
    navigate(`/put/${data.id}`);
  };

  const DeleteIngatlan = async () => {
    await ingatlanDelete(Number(id));
    queryClient.invalidateQueries({ queryKey: ['ingatlan'] });
    navigate('/ingatlan');
  };

  return (
    <>
      <h3>Reszletes Adatok</h3>
      <div>id: {data.id}</div>
      <div>orszag: {data.orszag}</div>
      <div>varos: {data.varos}</div>
      <div>negyzetmeter: {data.negyzetmeter}</div>
      <div>termek ara: {data.termekAra}</div>
      <div>tulaj neve: {data.tulajNeve}</div>
      <div>elerhetoseg: {data.elerhetoseg}</div>
      <button type="button" onClick={UpdateIngatlan}>
        Update
      </button>

      <button type="button" onClick={DeleteIngatlan}>
        Delete
      </button>
    </>
  );
}
