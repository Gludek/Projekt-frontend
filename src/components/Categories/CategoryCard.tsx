import styled from "styled-components";
import chevron from "../../assets/chevron.svg";
import ServiceCard from "../../components/Services/ServiceCard";
import { useState } from "react";

const Chevron = styled.img<{ isExpanded: boolean }>`
  width: 1rem;
  height: 1rem;
  transition: 0.2s ease-out;
  transform: ${({ isExpanded }) =>
    isExpanded ? "rotate(90deg)" : "rotate(0deg)"};
`;
const Category = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary["200"]};
  border-radius: 1rem;
  padding: 10px;
  gap: 0;
  scrollbar-gutter: auto;
  max-height: 50px;
  transition: 0.3s ease-out;
  &&[data-expanded="true"] {
    gap: 10px;
    max-height: 100%;
    transition: max-height 0.3s ease-in;
  }
`;
const CategoryTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  h4 {
    font-weight: 600;
  }
`;
const CategoryBody = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  max-height: 0;
  transition: 0.3s ease-out;
  &&[data-expanded="true"] {
    max-height: 100%;
    transition: 0.3s ease-in;
  }
`;
type CategoryCardProps = {
  title: string;
  services: {
    name: string;
    description: string;
    price: string;
  }[];
};
function CategoryCard({ title, services }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Category
      data-expanded={isExpanded}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CategoryTitle>
        <h4>{title}</h4>
        <Chevron src={chevron} isExpanded={isExpanded} />
      </CategoryTitle>
      <CategoryBody isExpanded={isExpanded} data-expanded={isExpanded}>
        {services.map((service) => (
          <ServiceCard service={service} />
        ))}
      </CategoryBody>
    </Category>
  );
}
export default CategoryCard;
