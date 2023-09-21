import { useGetServices } from "../../API/hooks/ServiceHooks";
import styled from "styled-components";
import CategoryCard from "../../components/Categories/CategoryCard";
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
`;

function Services() {
  const { data } = useGetServices();
  const services = data?.data ?? [];
  const groupedServicesObject = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});
  const groupedServices = Object.entries(groupedServicesObject).sort((a, b) =>
    a[0].localeCompare(b[0])
  );
  const firstHalf = groupedServices.slice(
    0,
    Math.ceil(Object.keys(groupedServices).length / 2)
  );
  const secondHalf = groupedServices.slice(
    Math.ceil(Object.keys(groupedServices).length / 2),
    Object.keys(groupedServices).length
  );

  return (
    <Body>
      {CategoryColumn(firstHalf)}
      {CategoryColumn(secondHalf)}
    </Body>
  );
}

export default Services;
function CategoryColumn(CategoryData: [string, unknown][]) {
  return (
    <Column>
      {Object.values(CategoryData).map((category) => {
        console.log(category);
        return <CategoryCard title={category[0]} services={category[1]} />;
      })}
    </Column>
  );
}
