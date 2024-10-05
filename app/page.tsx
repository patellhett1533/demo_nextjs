import SelectReason from "./_components/SelectReason";

const fetchContent = async () => {
  const res = await fetch(`${process.env.NEXT_API}/api/page-contents`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
    },
  });
  const data = await res.json();
  return data;
};

export default async function Home() {
  const pageContent = await fetchContent();
  if (!pageContent) return null;
  return (
    <div className="w-full min-h-dvh">
      <div className="flex flex-col  items-center justify-center h-dvh">
        <p className="uppercase mb-8 text-lg">{pageContent[0].head}</p>
        <h1 className="capitalize text-4xl font-bold">
          {pageContent[0].title}
        </h1>
        <p className="text-center mt-8 w-1/2">{pageContent[0].subtitle}</p>
        <div>
          <SelectReason data={pageContent[0].reason_data} />
        </div>
      </div>
    </div>
  );
}
