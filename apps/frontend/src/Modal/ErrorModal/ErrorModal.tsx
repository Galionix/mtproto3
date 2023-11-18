// renders error: ApolloError | undefined;

import { ApolloError } from "@apollo/client";
import { useModal } from "../Modal";
import { useEffect } from "react";
import s from "./errorModal.module.scss";

export const useErrorModal = (error: ApolloError | undefined) => {
  const onHide = () => {
    hideModal();
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const errorsCount = error?.networkError?.result?.errors?.length;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const firstErrorMessage = error?.networkError?.result?.errors[0]?.message;
  const [ErrorModal, { showModal, hideModal }] = useModal({
    children: (id) => {
      return (
        <div>
          <h1>Total errors: {errorsCount}</h1>
          <p>
            <strong>{firstErrorMessage}</strong>
          </p>
          {/* <span>{JSON.stringify(error.networkError.stack, null, 2)}</span> */}
          {/* <pre>
            {JSON.stringify(error?.networkError?.result?.errors, null, 2)}
          </pre> */}
          {/* <pre>{JSON.stringify(error.graphQLErrors)}</pre> */}
        </div>
      );
    },
    className: s.errorModal,
    danger: true,
    onCancel: onHide,
    title: "Error",
    // actionPropsDefault: error?.message,
  });
  useEffect(() => {
    if (error) {
      showModal(error.message);
    }
  }, [error]);
  return ErrorModal;
};
