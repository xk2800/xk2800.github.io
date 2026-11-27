import type { FieldProps } from "sanity";

function RequiredField(props: FieldProps) {
  const title = (
    <>
      {props.title} <span style={{ color: "#e5484d" }}>*</span>
    </>
  );
  // Studio types the title as a string, but renders it as a React child
  return props.renderDefault({ ...props, title: title as unknown as string });
}

// Runs a validation function against a stand-in rule that only records whether .required() is called
export function isRequired(validation: unknown) {
  if (typeof validation !== "function") return false;
  let required = false;
  const rule: object = new Proxy({}, {
    get: (_, method) => () => {
      if (method === "required") required = true;
      return rule;
    },
  });
  validation(rule);
  return required;
}

// Adds a red * to every required field, including fields nested in objects and lists
export function markRequired<T>(type: T): T {
  const { fields, of } = type as { fields?: any[]; of?: any[] };
  return {
    ...type,
    ...(fields && {
      fields: fields.map((field) => {
        const marked = markRequired(field);
        return isRequired(field.validation)
          ? { ...marked, components: { ...marked.components, field: RequiredField } }
          : marked;
      }),
    }),
    ...(of && { of: of.map(markRequired) }),
  };
}
