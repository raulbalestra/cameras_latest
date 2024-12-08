import toast from 'react-hot-toast';
import dataJSON from '../../public/data.json';

interface AlertSetting {
  id: string;
  criterion: number;
  para: string;
  type: number;
  value: string | number;
}

// Tipagem de dataJSON para suportar o acesso com chaves dinâmicas
interface DataJSONType {
  [key: string]: {
    price: number;
    delta_price: number;
    rating: string;
    delta_rating: number;
  };
}

const createToast = (title: string, msg: string, type: number) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full ${
        type === 0 ? 'bg-[#04b20c]' : type === 1 ? 'bg-[#eab90f]' : 'bg-[#e13f32]'
      } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="mt-1 text-sm text-white">{msg}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(t.id)}
          type="button"
          className="mr-2 box-content rounded-none border-none opacity-100 hover:no-underline hover:opacity-50 focus:opacity-50 focus:shadow-none focus:outline-none text-white"
          data-te-toast-dismiss
          aria-label="Close"
        >
          <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  ));
};

const fireToast = () => {
  const alertSettings = localStorage.getItem('alertSettings');
  if (alertSettings) {
    const parsedSettings: AlertSetting[] = JSON.parse(alertSettings);

    parsedSettings.forEach((alertSetting) => {
      // Força value a ser número
      const value = parseFloat(alertSetting.value as string);
      if (isNaN(value)) return; // Se value não é número, ignora a condição

      const para = alertSetting.criterion < 2 ? `delta_${alertSetting.para}` : alertSetting.para;

      if (alertSetting.id === 'ALL') {
        Object.keys(dataJSON as DataJSONType).forEach((id) => {
          const data = (dataJSON as DataJSONType)[id];
          const dataValue = data[para as keyof typeof data];

          if (typeof dataValue === 'number') {
            const condition =
              alertSetting.criterion === 0
                ? value <= -1 * dataValue
                : alertSetting.criterion === 1 || alertSetting.criterion === 3
                ? value >= dataValue
                : alertSetting.criterion === 2
                ? value <= dataValue
                : value === dataValue;

            const realValue = alertSetting.criterion === 0 ? dataValue * -1 : dataValue;

            if (condition) {
              const msg = `${alertSetting.para} of ${id} ${
                alertSetting.criterion === 0
                  ? 'goes down by'
                  : alertSetting.criterion === 1
                  ? 'goes up by'
                  : alertSetting.criterion === 2
                  ? 'is smaller than'
                  : alertSetting.criterion === 3
                  ? 'is greater than'
                  : 'is equal to'
              } ${realValue}`;
              createToast(id, msg, alertSetting.type);
            }
          }
        });
      } else {
        const id = alertSetting.id;
        const data = (dataJSON as DataJSONType)[id];
        const dataValue = data[para as keyof typeof data];

        if (typeof dataValue === 'number') {
          const condition =
            alertSetting.criterion === 0
              ? value >= -1 * dataValue
              : alertSetting.criterion === 1 || alertSetting.criterion === 3
              ? value >= dataValue
              : alertSetting.criterion === 2
              ? value <= dataValue
              : value === dataValue;

          const realValue = alertSetting.criterion === 0 ? dataValue * -1 : dataValue;

          if (condition) {
            const msg = `${alertSetting.para} of ${id} ${
              alertSetting.criterion === 0
                ? 'goes down by'
                : alertSetting.criterion === 1
                ? 'goes up by'
                : alertSetting.criterion === 2
                ? 'is smaller than'
                : alertSetting.criterion === 3
                ? 'is greater than'
                : 'is equal to'
            } ${realValue}`;
            createToast(id, msg, alertSetting.type);
          }
        }
      }
    });
  }
};

export default fireToast;
