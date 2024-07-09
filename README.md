# Autocomplete Demo

Just one more example of how to use shadcn/ui to create a custom autocomplete component.

I talk about it on this video: https://youtu.be/1hfd9CKbv7E

```tsx
function App() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["data", searchValue],
    queryFn: () => getList(searchValue),
  });

  return (
    <AutoComplete
      selectedValue={selectedValue}
      onSelectedValueChange={setSelectedValue}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      items={data ?? []}
      // Optional props
      isLoading={isLoading}
      emptyMessage="No items found."
      placeholder="Search items..."
    />
  );
}
```

Took inspiration from [this issue](https://github.com/shadcn-ui/ui/issues/173) and [this example](https://www.armand-salle.fr/post/autocomplete-select-shadcn-ui/).
