export default function HelloReactView() {
  return (
    <div className="m-l">
      <p>
        Use the menu to try out different forms.
      </p>
      <p>
        When you submit a registration, it will be validated on the server.
        To demonstrate additional server validation, some values are not accepted:
        "john.doe@example.com" as email and "0123456789" as phone number.
      </p>
    </div>
  );
}
