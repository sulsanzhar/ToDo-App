export const QuantityTasks = ({ quantity }: { quantity: number }) => {
    return (
        <div className="QuantityTasks">
            <h3>You have { quantity } todos</h3>
        </div>
    );
};
