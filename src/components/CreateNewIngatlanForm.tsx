import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIngatlan } from '../api/ingatlanok.api';

export default function CreateNewIngatlanForm() {
  const [orszag, setOrszag] = useState<string>('');
  const [varos, setVaros] = useState<string>('');
  const [negyzetmeter, setNegyzetmeter] = useState<number>(0);
  const [termekAra, setTermekAra] = useState<number>(0);
  const [tulajNeve, setTulajNeve] = useState<string>('');
  const [elerhetoseg, setElerhetoseg] = useState<string>('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: createIngatlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingatlan'] });
    },
  });

  const handleCreate = () => {
    mutate({
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
      <h3>Uj Ingatlan letrehozasa</h3>
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
        <input type="button" onClick={handleCreate} value="Create" />
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
