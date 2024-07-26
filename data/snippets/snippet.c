typedef struct deque_node {
  void *data;
  struct deque_node *next;
  struct deque_node *prev;
} Node;

struct deque_type {
  Node *front;
  Node *back;
};

static void terminate(const char *message) {
  printf("%s\n", message);
  exit(EXIT_FAILURE);
}

Deque create_deque(void) {
  Deque deque = (Deque)malloc(sizeof(struct deque_type));

  if (deque == NULL) {
    terminate("Error in create_deque(): failed to allocate deque.\n");
  }

  deque->front = NULL;
  deque->back = NULL;

  return deque;
}

void destroy_deque(Deque deque) {
  void *ptr;

  while (!deque_is_empty(deque)) {
    ptr = deque_pop_front(deque);
    free(ptr);
  }

  free(deque);
}

bool deque_is_empty(Deque deque) {
  if (deque->front == NULL && deque->back != NULL) {
    deque->front = deque->back;
  } else if (deque->front != NULL && deque->back == NULL) {
    deque->back = deque->front;
  }

  return deque->front == NULL && deque->back == NULL;
}

bool deque_push_back(Deque deque, void *data) {
  Node *new_node = (Node *)malloc(sizeof(Node));

  if (new_node == NULL) {
    return false;
  }

  new_node->data = malloc(sizeof(*data));

  if (new_node->data == NULL) {
    free(new_node);
    return false;
  }

  memcpy(new_node->data, data, sizeof(*data));

  if (deque->back != NULL) {
    deque->back->prev = new_node;
    new_node->next = deque->back;
  }

  deque->back = new_node;

  if (deque->front == NULL) {
    deque->front = new_node;
  }

  return true;
}

bool deque_push_front(Deque deque, void *data) {
  Node *new_node = (Node *)malloc(sizeof(Node));

  if (new_node == NULL) {
    return false;
  }

  new_node->data = malloc(sizeof(*data));

  if (new_node->data == NULL) {
    free(new_node);
    return false;
  }

  memcpy(new_node->data, data, sizeof(*data));

  if (deque->front != NULL) {
    deque->front->next = new_node;
    new_node->prev = deque->front;
  }

  deque->front = new_node;

  if (deque->back == NULL) {
    deque->back = new_node;
  }

  return true;
}

void *deque_pop_back(Deque deque) {
  if (deque_is_empty(deque)) {
    return NULL;
  }

  Node *buffer = deque->back;
  void *data = malloc(sizeof(*(buffer->data)));

  if (data == NULL) {
    return NULL;
  }

  memcpy(data, buffer->data, sizeof(*(buffer->data)));
  deque->back = buffer->next;

  if (deque->back == NULL) {
    deque->front = NULL;
  } else {
    deque->back->prev = NULL;
  }

  free(buffer->data);
  free(buffer);

  return data;
}

void *deque_pop_front(Deque deque) {
  if (deque_is_empty(deque)) {
    return NULL;
  }

  Node *buffer = deque->front;
  void *data = malloc(sizeof(*(buffer->data)));

  if (data == NULL) {
    return NULL;
  }

  memcpy(data, buffer->data, sizeof(*(buffer->data)));
  deque->front = buffer->prev;

  if (deque->front == NULL) {
    deque->back = NULL;
  } else {
    deque->front->next = NULL;
  }

  free(buffer->data);
  free(buffer);

  return data;
}

void *deque_back(Deque deque) {
  if (deque_is_empty(deque)) {
    return NULL;
  }

  return deque->back->data;
}
void *deque_front(Deque deque) {
  if (deque_is_empty(deque)) {
    return NULL;
  }

  return deque->front->data;
}
