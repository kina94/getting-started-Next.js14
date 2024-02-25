# getting-started-NextJs

## Routing
### Rendering
- NextJS는 'use client'의 사용 유무와 상관 없이 클라이언트 컴포넌트와 서버 컴포넌트 둘 다 서버에서 렌더링*한다.(*next가 리액트 코드를 브라우저가 이해할 수 있는 HTML로 변환하는 과정) 
- 그 후 'use clinet'를 사용한 컴포넌트는 렌더링 이후 hydration* 된다. (HTML위에 클라이언트측 자바스크립트나 이벤트 리스너를 붙이면서 상호작용이 가능한 요소로 변화시키는 과정)
- CSR 어플리케이션은 클라이언트가 자바스크립트를 읽고, 자바스크립트가 UI를 빌드한다.
- SSR 어플리케이션은 서버에서 HTML로 변환하여 UI를 사용자에게 보여준다.
- "use client"은 서버와 클라이언트 컴포넌트 모듈 간의 경계를 선언하는 데 사용된다.

### Components
- 클라이언트 컴포넌트를 서버 컴포넌트에 임포트할 수 있으나 서버 컴포넌트를 클라이언트 컴포넌트에 임포트할 수는 없다
- 단, NextJS의 최신 버전에서는 클라이언트 컴포넌트에 props를 사용하여 서버 컴포넌트를 주입할 수 있다. 이 경우 서버 컴포넌트는 서버 컴포넌트로써 사용될 수 있다.
- 정적인 컴포넌트는 서버 컴포넌트로, 상호작용이 필요한 컴포넌트는 클라이언트 컴포넌트로 생성하여 자바스크립트의 다운로드 시간을 줄이고 웹 성능을 향상시킬 수 있다.

### Layout
- 페이지는 개별의 layout을 가질 수 있다.
- 레이아웃은 상쇄되지 않고 중첩되어 합쳐지기 때문에 부모 요소에 정의된 레이아웃은 자식 요소에도 적용된다.

### Metadata
- metadata를 사용하고 싶다면 각 페이지의 상단에  ```export cosnt meatada``` 객체를 정의한다.
- 메타데이터가 페이지별로 정의된 경우 병합 된다.
- templates 속성을 사용하면 페이지별로 중복해서 메타데이터를 주입하지 않아도 된다.
```javascript
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme',
    default: 'Acme', // a default is required when creating a template
  },
}
```
- generateMetadata를 사용하여 동적으로 메타 데이터를 주입할 수 있다. 서버 컴포넌트에서만 사용 가능하다. 또한, 메타 데이터를 생성하기위해 함수 내에서 fetch를 호출해도 fetch가 캐싱되어 있기 때문에 성능상의 문제가 발생하지 않는다.
- 컴포넌트와 마찬가지로 props로 현재 url 정보를 호출할 수 있다.
```javascript
export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}
```


### Route
- () 소괄호를 사용하여 루트를 그룹화할 수 있다. 괄호를 사용하면 라우팅 url에 포함되지 않는다.
- [] 대괄호를 사용하여 다이나믹 루트를 사용할 수 있다. 컴포넌트에서 props를 호출하면 대괄호 내부메 명칭한 이름을 키값으로 현재 url을 받을 수 있다. 


## Data Fetching
### Server Side
```javascript
// Client Side
// 데이터를 보여주기 위해서는 state를 사용해야 하고 state를 사용함으로써 매번 불필요한 렌더링을 발생시킨다.
// 서버 컴포넌트에서 사용할 수 있는 MetaData와 같은 요소들을 사용할 수 없다.
// 클라이언트에서 fetch가 이루어지기 때문에 사용자에게 fetch 중인 데이터외의 요소를 먼저 보여줄 수 있다.
// 클라이언트에서 fetch가 이루어지기 때문에 네트워크탭에 모든 정보가 노출되어 보안에 취약하다.

export default function Page() {
  const [isLoading, seIstLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const reponse = await fetch(URL);
    const json = await reponse.json();
    setMovies(json);
    seIstLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return <div>{isLoading ? "loading..." : JSON.stringify(movies)}</div>;
}
```

```javascript
// Server Side
// 서버에서 fetching하고 fetching된 데이터를 사용자에게 보여주기 때문에 state가 불필요하다.
// Next.j에서는 웹 fetch() API를 확장하여 서버의 각 요청을 자체적으로 캐싱할 수 있다.
// https://nextjs.org/docs/app/api-reference/functions/fetch
// 서버에서 fetch가 이루어지기 때문에 response가 도착하기 전까지 사용자는 웹페이지를 볼 수 없다. 이를 방지하기 위해 loading.tsx 컴포넌트가 필요하다.
// 서버에서 fetch가 이루어지기 때문에 외부로 노출되어서는 안 되는 정보들을 감출 수 있어 보안에 유리하다.

async function getMovies() {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();
  return <div>{JSON.stringify(movies)}</div>;
}
```

### Loading
- 서버 컴포넌트에서는 loadindg.tsx를 통해 useState와 usEffect를 사용하지 않고도 로딩 상태를 표시할 수 있다.
- page.tsx와 같은 뎁스에 존재해야 한다. 같은 뎁스에 존재하는 page가 로드되는 동안 즉시 로딩 상태를 표시할 수 있고, 로딩이 완료되면 로드된 component로 자동 교체된다.
- 사용자가 웹사이트에 접근하는 순간 Next.js는 서버에서 렌더링된 HTML을 청크로 나눠 준비가 완료된 HTML을 브라우저에게 먼저 서빙하고, 데이터 fetching 중인 async 컴포넌트는 await으로 대기하다 await이 끝나면 브라우저에게 마지막 HTML 부분을 전달한다. 그 후 프레임워크는 loading component를 async component로 대체한다.
- 이를 통해 서버 컴포넌트에서 fetch 시 response가 도착할 때까지 사용자가 UI를 볼 수 없는 문제점을 해결할 수 있다.
- https://nextjs.org/docs/app/builidng-you-application/routing/loading-ui-and-streaming

### Parallel Reqeusts
- Promise.all() 메서드는 연관된 비동기 작업 여러 개가 동시에 이행되어야 하는 경우에 사용한다. 입력 값으로 들어온 프로미스 중 하나라도 실패하면 Promise.all() 전체가 실패한다.
```javascript
const [movie, video] = await Promise.all([getMovie(id), getVideo(id])
```

### Suspense
- Promise.all()의 문제점은 두 개의 프로미스가 모두 반환될 때까지 사용자가 loading 페이지를 보며 기다려야 한다는 점이다. Suspense를 통해 병렬적으로 처리하되 준비된 데이터부터 사용자에게 제공할 수 있고, 구체적으로 어떤 부분이 fetching 중인지 보여줄 수 있다.
```javascript
export default async function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <h1>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading move video</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </h1>
  );
}
```

### Prefetch
- Link 컴포넌트의 prefetch 속성을 사용하여 리소스를 미리 불러올 수 있어 사용자 경험을 향상시킬 수 있고 서버의 리소스 과부하를 방지할 수 있다.

### Error Handling
- 서버 컴포넌트에서는 error.tsx를 통해 해당 페이지, 또는 자식 컴포넌트에서 런타임 에러가 발생하면 에러 페이지를 보여줄 수 있다.
- 에러 페이지는 같은 뎁스에 있는 페이지에서 발생하는 에러에 한정하여 적용된다.
- 페이지와 같은 뎁스에 존재해야 한다.

## Styles
### Global Styles
- 글로벌 스타일은 global.css로 생성하며, 어플리케이션의 모든 레이아웃, 페이지 또는 컴포넌트에 전역으로 스타일을 설정할 때 사용된다.

### CSS Moudles
- Next.js는 .module.css 확장자를 사용하여 고유한 클래스 이름을 자동으로 생성하고 CSS 범위를 임포트한 컴포넌트로 지정한다. 이를 통해 충돌을 걱정하지 않아도 되고, 다른 파일에서 동일한 클래스명을 사용할 수 있다.


