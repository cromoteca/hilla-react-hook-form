# Hilla + React Hook Form

This project is a POC of integration between Hilla and React Hook Form.

## Features

- Custom server-side validator
- Simulate generation of a `resolver` (a static file which matches what would be generated if we implement that in Hilla)
- A customized `useHillaForm` hook, which can be used in place of the one by React Hook Form and simplifies using Vaadin components in forms
- Propagation of server-side error messages to components
- Optional real-time server-side validation that can replace the client-side one or, better, complement it.
- Checkbox wrapper that supports validation, which is also an example of how Vaadin Components can be wrapped to work with React Hook Form

This is how the form looks:

```tsx
const { field, handleSubmit, validate } = useHillaForm<RegistrationInfo>({
    mode: 'all',
    resolver: RegistrationInfoResolver,
    serverResolver: RegistrationEndpoint.preValidate,
});

const onSubmit = async (data: RegistrationInfo) => {
    try {
        const result = await validate(RegistrationEndpoint.handleRegistration(data));
        result && Notification.show(result, { theme: "success" });
    } catch (error: any) {
        Notification.show(error.message, { theme: "error" });
    }
};

return (
    <VerticalLayout className='p-m'>
        <TextField label="Name" required {...field("name")} />
        <EmailField label="Email" required {...field("email")} />
        <TextField label="Phone" {...field("phone")} />
        <Select label="Country" required items={countries} {...field("country")} />
        <ValidatedCheckbox label="I agree to the terms and conditions" {...field("terms")} />
        <Button theme="primary" onClick={handleSubmit(onSubmit)}>Register</Button>
    </VerticalLayout>
);
```

---

## Running the application

The project is a standard Maven project. To run it from the command line,
type `mvnw` (Windows), or `./mvnw` (Mac & Linux), then open
http://localhost:8080 in your browser.

You can also import the project to your IDE of choice as you would with any
Maven project.

## Deploying to Production

To create a production build, call `mvnw clean package -Pproduction` (Windows),
or `./mvnw clean package -Pproduction` (Mac & Linux).
This will build a JAR file with all the dependencies and front-end resources,
ready to be deployed. The file can be found in the `target` folder after the build completes.

Once the JAR file is built, you can run it using
`java -jar target/myapp-1.0-SNAPSHOT.jar` (NOTE, replace
`myapp-1.0-SNAPSHOT.jar` with the name of your jar).

## Project structure

<table style="width:100%; text-align: left;">
  <tr><th>Directory</th><th>Description</th></tr>
  <tr><td><code>frontend/</code></td><td>Client-side source directory</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.html</code></td><td>HTML template</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.ts</code></td><td>Frontend 
entrypoint, bootstraps a React application</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>routes.tsx</code></td><td>React Router routes definition</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>MainLayout.tsx</code></td><td>Main 
layout component, contains the navigation menu, uses <a href="https://hilla.dev/docs/react/components/app-layout">
App Layout</a></td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>views/</code></td><td>UI view 
components</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>themes/</code></td><td>Custom  
CSS styles</td></tr>
  <tr><td><code>src/main/java/&lt;groupId&gt;/</code></td><td>Server-side 
source directory, contains the server-side Java views</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>Application.java</code></td><td>Server entry-point</td></tr>
</table>

## Useful links

- Read the documentation at [hilla.dev/docs](https://hilla.dev/docs/).
- Ask questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/hilla) or join our [Discord channel](https://discord.gg/MYFq5RTbBn).
- Report issues, create pull requests in [GitHub](https://github.com/vaadin/hilla).
