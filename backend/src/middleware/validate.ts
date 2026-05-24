export const validate = (schema: any) => (req: any, _res: any, next: any) => {
  try {
    const validated = schema.parse({
      body: req.body || {},
      query: req.query || {},
      params: req.params || {},
    });

    req.validated = validated;

    next();
  } catch (error) {
    next(error);
  }
};
