import { useParams } from 'react-router-dom';

export default function Category() {
  const { keyword } = useParams();

  return <h1>Category: {keyword}</h1>;
}
