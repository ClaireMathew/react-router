import Feed from './Feed';
import { useLayoutEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Home = () => {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const searchResults = useStoreState((state) => state.searchResults);

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3000/posts');

useLayoutEffect(() => {
  setPosts(data);
}, [data, setPosts])

    return (
      <main className="Home">
        {isLoading&& <p className="statusMsg">Loading posts...</p>}
        {!isLoading && fetchError && <p className="statusMsg" style={{color:"red"}}>{fetchError}</p>}
        {!isLoading && !fetchError && (searchResults.length ? <Feed posts= {searchResults} /> : <p className="statusMsg"></p>)}
      </main>
    )
  }
  
  export default Home;