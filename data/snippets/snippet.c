typedef struct dequeNode {
    void* data;
    struct dequeNode* next;
    struct dequeNode* prev;
} Node;

struct dequeType {
    Node* front;
    Node* back;
};

static void terminate(const char* message) {
    printf("%s\n", message);
    exit(EXIT_FAILURE);
}

Deque createDeque(void) {
    Deque deque = (Deque)malloc(sizeof(struct dequeType));

    if (deque == NULL) {
        terminate("Error in createDeque(): failed to allocate deque.\n");
    }

    deque->front = NULL;
    deque->back = NULL;

    return deque;
}

void destroyDeque(Deque deque) {
    void* ptr;

    while (!dequeIsEmpty(deque)) {
        ptr = dequePopFront(deque);
        free(ptr);
    }

    free(deque);
}

bool dequeIsEmpty(Deque deque) {
    if (deque->front == NULL && deque->back != NULL) {
        deque->front = deque->back;
    } else if (deque->front != NULL && deque->back == NULL) {
        deque->back = deque->front;
    }

    return deque->front == NULL && deque->back == NULL;
}

bool dequePushBack(Deque deque, void* data) {
    Node* newNode = (Node*)malloc(sizeof(Node));

    if (newNode == NULL) {
        return false;
    }

    newNode->data = malloc(sizeof(*data));

    if (newNode->data == NULL) {
        free(newNode);
        return false;
    }

    memcpy(newNode->data, data, sizeof(*data));

    if (deque->back != NULL) {
        deque->back->prev = newNode;
        newNode->next = deque->back;
    }

    deque->back = newNode;

    if (deque->front == NULL) {
        deque->front = newNode;
    }

    return true;
}

bool dequePushFront(Deque deque, void* data) {
    Node* newNode = (Node*)malloc(sizeof(Node));

    if (newNode == NULL) {
        return false;
    }

    newNode->data = malloc(sizeof(*data));

    if (newNode->data == NULL) {
        free(newNode);
        return false;
    }

    memcpy(newNode->data, data, sizeof(*data));

    if (deque->front != NULL) {
        deque->front->next = newNode;
        newNode->prev = deque->front;
    }

    deque->front = newNode;

    if (deque->back == NULL) {
        deque->back = newNode;
    }

    return true;
}

void* dequePopBack(Deque deque) {
    if (dequeIsEmpty(deque)) {
        return NULL;
    }

    Node* buffer = deque->back;
    void* data = malloc(sizeof(*(buffer->data)));

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

void* dequePopFront(Deque deque) {
    if (dequeIsEmpty(deque)) {
        return NULL;
    }

    Node* buffer = deque->front;
    void* data = malloc(sizeof(*(buffer->data)));

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

void* dequeBack(Deque deque) {
    if (dequeIsEmpty(deque)) {
        return NULL;
    }

    return deque->back->data;
}
void* dequeFront(Deque deque) {
    if (dequeIsEmpty(deque)) {
        return NULL;
    }

    return deque->front->data;
}

