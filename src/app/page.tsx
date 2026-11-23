import { DiscoverView } from "@/components/discover-view";
import { buildDiscover } from "@/lib/discover";
import { getFeed, listEvents, listRooms } from "@/lib/data";

export default function DiscoverPage() {
  const { tonight, feed } = buildDiscover(getFeed(), listEvents(), listRooms());
  return <DiscoverView tonight={tonight} feed={feed} />;
}
