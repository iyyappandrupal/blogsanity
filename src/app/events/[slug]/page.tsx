import { defineQuery, PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getClient } from "../../../../lib/sanity.client";
import Link from "next/link";
import Image from "next/image";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

const options = { next: { revalidate: 60 } };

const EVENT_QUERY = defineQuery(`*[
  _type == "event" &&
  slug.current == $slug
][0]{
  ...,
  "date": coalesce(date, now()),
  "doorsOpen": coalesce(doorsOpen, 0),
  headline->,
  venue->
}`);

export default async function EventPage({
  params,
}: {
  params: { slug: string }; // Adjusted type
}) {
  const draft = draftMode().isEnabled; // Synchronous handling
  const client = getClient(draft);

  const { projectId, dataset } = client.config();
  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  const { slug } = await params; // Await params as it's a promise
  const event = await client.fetch(EVENT_QUERY, { slug }, options);

  if (!event) {
    notFound();
  }

  const {
    name,
    date,
    headline,
    image,
    details,
    eventType,
    doorsOpen,
    venue,
    tickets,
  } = event;

  const eventImageUrl = image
    ? urlFor(image)?.width(550).height(310).url()
    : "https://via.placeholder.com/550x310";
  const eventDate = date ? new Date(date).toDateString() : null;
  const eventTime = date ? new Date(date).toLocaleTimeString() : null;
  const doorsOpenTime = date
    ? new Date(new Date(date).getTime() - doorsOpen * 60000).toLocaleTimeString()
    : null;

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4">
        <Link href="/">← Back to events</Link>
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2">
        <Image
          src={eventImageUrl}
          alt={name || "Event"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="310"
          width="550"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {eventType && (
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 capitalize">
                {eventType.replace("-", " ")}
              </div>
            )}
            {name && (
              <h1 className="text-4xl font-bold tracking-tighter mb-8">{name}</h1>
            )}
            {headline?.name && (
              <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
                <dd className="font-semibold">Artist</dd>
                <dt>{headline.name}</dt>
              </dl>
            )}
            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
              <dd className="font-semibold">Date</dd>
              <div>
                {eventDate && <dt>{eventDate}</dt>}
                {eventTime && <dt>{eventTime}</dt>}
              </div>
            </dl>
            {doorsOpenTime && (
              <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
                <dd className="font-semibold">Doors Open</dd>
                <dt>{doorsOpenTime}</dt>
              </dl>
            )}
            {venue?.name && (
              <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
                <dd className="font-semibold">Venue</dd>
                <dt>{venue.name}</dt>
              </dl>
            )}
          </div>
          {details?.length > 0 && (
            <div className="prose max-w-none">
              <PortableText value={details} />
            </div>
          )}
          {tickets && (
            <a
              className="flex items-center justify-center rounded-md bg-blue-500 p-4 text-white"
              href={tickets}
            >
              Buy Tickets
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
