import emptyState from '../../../../../assets/images/empty-state.svg';

export function EmptyTransactions() {
  return (
    <div className="flex justify-center items-center flex-col gap-4 text-center h-full ">
      <img src={emptyState} alt="" />
      <small className="font-normal text-base tracking-[0px] leading-[140%] text-muted-foreground ">
        Não encontramos nenhuma transação!
      </small>
    </div>
  );
}
