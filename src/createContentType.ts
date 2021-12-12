const createContentType = (type: string): Record<"Content-Type", string> => {
  return { "Content-Type": type };
}

export default createContentType;