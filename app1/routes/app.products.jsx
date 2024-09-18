import { Card, Frame, Layout, Page, Text, DataTable } from "@shopify/polaris";
import { useEffect, useState } from "react";

export default function Products() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEntriesFromLive = async () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      try {
        const response = await fetch("https://staging2.creativewebsol.com/samedo/ntwrkHTML/dashboard.php", requestOptions);
        const result = await response.json();
        console.log(result);
        setEnquiries(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEntriesFromLive();
  }, []); 

  const rows = enquiries.map((enq) => [
    enq.vorname,
    enq.nachmane,
    enq.location,
    enq.user_email,
    enq.telefonnummer,
    <a target="_blank" href={enq.recipt_file}>Beleg herunterladen</a>
  ]);

  return (
    <Frame>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            <Card>
              <Text as="h2" variant="headingMd">
                Rezept-Upload
              </Text>
              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text", "text"]}
                headings={["vorname", "nachmane", "location", "email", "telefonnummer", "Beleg herunterladen"]}
                rows={rows}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
