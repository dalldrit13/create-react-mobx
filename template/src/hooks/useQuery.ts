import { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function useQuery() {
  const history = useHistory()
  const { pathname, search } = history.location;
  const setQuery = (query = {}) => {
    history.push({
      pathname,
      search: `?${new URLSearchParams(query).toString()}`
    })
  }

  return [useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search]), setQuery];
}