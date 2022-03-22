import { Table, Tr, Th, Td } from './Table';
import FeedbackRow from './FeedbackRow';

const FeedbackTable = ({ allFeedback }) => {
  const toggleStatus = (e) => {
    console.log(e);
  };

  console.log(allFeedback);

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Site</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Status</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {allFeedback.map((feedback) => (
          <FeedbackRow key={feedback.id} {...feedback} />
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
