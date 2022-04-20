import FSelect from "./form/FSelect";

const MovieSort = ({ genres }) => {
  return (
    <FSelect name="sortBy" label="Genres" size="small" sx={{ width: 120 }}>
      {genres.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </FSelect>
  );
};

export default MovieSort;
