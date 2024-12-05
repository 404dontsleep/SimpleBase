import { Card, Col, Row, Statistic, StatisticProps } from "antd";
import ScrollView from "@/components/layouts/ScrollView";
import useConfigsHook from "@/components/configs/MyConfig";
export default function Dashboard() {
  return (
    <ScrollView
      style={{
        flex: 1,
        marginLeft: 10,
        gap: 10,
        flexDirection: "column",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <SimpleMultiCard
        props={[
          {
            title: "Total",
            value: 10,
            precision: 2,
            valueStyle: { color: "#3f8600" },
            suffix: "%",
          },
          { title: "Total", value: 10 },
          { title: "Total", value: 10 },
          { title: "Total", value: 10 },
        ]}
      />
      <Test />
    </ScrollView>
  );
}

function SimpleMultiCard({ props }: { props: StatisticProps[] }) {
  return (
    <Row gutter={[10, 10]} align={"stretch"}>
      {props.map((p, i) => (
        <Col key={i} xs={24} md={12} lg={6}>
          <Card bordered={false}>
            <Statistic {...p} />
          </Card>
        </Col>
      ))}
    </Row>
  );
}

function Test() {
  const { elements, values } = useConfigsHook({
    hello: {
      type: "string",
      value: "hello",
    },
  });
  return (
    <>
      {elements}
      {JSON.stringify(values)}
    </>
  );
}
