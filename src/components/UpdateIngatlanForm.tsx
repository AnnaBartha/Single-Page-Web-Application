import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { putIngatlan } from '../api/ingatlanok.api';
import IngatlanDetailsHook from '../query/IngatlanDetailsHook';

export default function UpdateIngatlanForm() {
  const { id: ingatlanId } = useParams();
  const [id] = useState<number>(ingatlanId ? Number(ingatlanId) : 0);
  const [orszag, setOrszag] = useState<string>('');
  const [varos, setVaros] = useState<string>('');
  const [negyzetmeter, setNegyzetmeter] = useState<number>(0);
  const [termekAra, setTermekAra] = useState<number>(0);
  const [tulajNeve, setTulajNeve] = useState<string>('');
  const [elerhetoseg, setElerhetoseg] = useState<string>('');
  const { data: ingatlanData } = IngatlanDetailsHook(Number(id));

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (ingatlanData) {
      setOrszag(ingatlanData.orszag);
      setVaros(ingatlanData.varos);
      setNegyzetmeter(ingatlanData.negyzetmeter);
      setTermekAra(ingatlanData.termekAra);
      setTulajNeve(ingatlanData.tulajNeve);
      setElerhetoseg(ingatlanData.elerhetoseg);
    }
  }, [ingatlanData]);

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: putIngatlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingatlan'] });
    },
  });

  const handleCreate = () => {
    mutate({
      id,
      orszag,
      varos,
      negyzetmeter,
      termekAra,
      tulajNeve,
      elerhetoseg,
    });
  };

  return (
    <>
      <h3>Ingatlan modositasa</h3>
      <div>
        <p>
          Orszag:
          <input type="text" value={orszag} onChange={(val) => setOrszag(val.target.value)} />
        </p>
      </div>
      <div>
        <p>
          Varos:
          <input type="text" value={varos} onChange={(val) => setVaros(val.target.value)} />
        </p>
      </div>
      <div>
        <p>
          Negyzetmeter:
          <input type="number" value={negyzetmeter} onChange={(val) => setNegyzetmeter(Number(val.target.value))} />
        </p>
      </div>
      <div>
        <p>
          TermekAra:
          <input type="number" value={termekAra} onChange={(val) => setTermekAra(Number(val.target.value))} />
        </p>
      </div>
      <div>
        <p>
          TulajNeve:
          <input type="text" value={tulajNeve} onChange={(val) => setTulajNeve(val.target.value)} />
        </p>
      </div>
      <div>
        <p>
          Elerhetoseg:
          <input type="text" value={elerhetoseg} onChange={(val) => setElerhetoseg(val.target.value)} />
        </p>
      </div>
      <div>
        <input type="button" onClick={handleCreate} value="Update" />
      </div>
      {isPending && (
        <div>
          <i>In process...</i>
        </div>
      )}
      {isError && <div className="error">Error occurred: {error.message}</div>}
      {data && navigate(`/ingatlan/${data.id}`)}
    </>
  );
}
