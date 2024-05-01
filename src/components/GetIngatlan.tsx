import { Link } from 'react-router-dom';
import GetIngatlanHook from '../query/GetIngatlanHook';

export default function GetAllIngatlans() {
  const { data, isLoading, isError, error } = GetIngatlanHook();

  if (isLoading) {
    return <div>page is loading...</div>;
  }

  if (isError) {
    return <div className="error">{error?.message}</div>;
  }

  return (
    <>
      <h3>Ingatlanok Listaja</h3>
      <ul>
        {data?.map((ingatlan) => (
          <li key={ingatlan.id}>
            <Link to={`/ingatlan/${ingatlan.id}`}>
              {ingatlan.id}.&nbsp;
              {ingatlan.orszag}.&nbsp;
              {ingatlan.negyzetmeter}.&nbsp;
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
