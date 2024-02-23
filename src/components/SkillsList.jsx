import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionSkills() {
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Languages</AccordionTrigger>
        <AccordionContent>
          <p class='flex items-center text-sm lg:text-base'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              class='bi bi-check2-all'
              viewBox='0 0 16 16'
            >
              <path d='M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0'></path>
              <path d='m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708'></path>
            </svg>
            <span class='pl-xxxxs'>HTML 5</span>
          </p>
          <p class='flex items-center text-sm lg:text-base'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              class='bi bi-check2-all'
              viewBox='0 0 16 16'
            >
              <path d='M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0'></path>
              <path d='m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708'></path>
            </svg>
            <span class='pl-xxxxs'>CSS</span>
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          <p class='flex items-center text-sm lg:text-base'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              class='bi bi-check2-all'
              viewBox='0 0 16 16'
            >
              <path d='M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0'></path>
              <path d='m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708'></path>
            </svg>
            <span class='pl-xxxxs'>SCSS</span>
          </p>
          <p class='flex items-center text-sm lg:text-base'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              class='bi bi-check2-all'
              viewBox='0 0 16 16'
            >
              <path d='M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0'></path>
              <path d='m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708'></path>
            </svg>
            <span class='pl-xxxxs'>Boostrap</span>
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          <p class='flex items-center text-sm lg:text-base'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              class='bi bi-check2-all'
              viewBox='0 0 16 16'
            >
              <path d='M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0'></path>
              <path d='m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708'></path>
            </svg>
            <span class='pl-xxxxs'>PHP</span>
          </p>
          <p class='flex items-center text-sm lg:text-base'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              class='bi bi-check2-all'
              viewBox='0 0 16 16'
            >
              <path d='M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0'></path>
              <path d='m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708'></path>
            </svg>
            <span class='pl-xxxxs'>JS</span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
