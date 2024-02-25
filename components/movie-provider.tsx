import { URL } from "../constants/api";
import styles from "../styles/movie-providers.module.css";

async function getMovieProviders(id: string) {
  const response = await fetch(`${URL}/${id}/providers`);
  return response.json();
}

export default async function MovieProvider({ id }: { id: string }) {
  const providers = await getMovieProviders(id);

  return (
    <div className={styles.container}>
      {Object.entries(providers).map(([key, value]) => (
        <div>
          <a href={providers[key].link} target="_blank">
            {key}
          </a>
          <div>
            <h1>Providers</h1>
            {providers[key].buy?.map(({ logo_path, provider_name }) => (
              <BuyComponent
                logo_path={logo_path}
                provider_name={provider_name}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const BuyComponent = ({
  logo_path,
  provider_name,
}: {
  logo_path: string;
  provider_name: string;
}) => {
  return (
    <div>
      <img src={logo_path} />
      <h3>{provider_name}</h3>
    </div>
  );
};
